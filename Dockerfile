# Stage 1: Base
FROM node:20-alpine as base

# Set environment variables
ENV NODE_ENV=production

# Create and set permissions for the application directory
RUN addgroup -g 2000 -S appgroup && \
    adduser -DH -s /sbin/nologin -u 2000 -G appgroup -S appuser && \
    mkdir /app && \
    chown -R appuser:appgroup /app

# Set working directory
WORKDIR /app

# Stage 2: Dependencies
FROM base as dependencies

# Copy package files and install dependencies
COPY --chown=appuser:appgroup . /app/
ARG NODE_AUTH_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc && \
    npm ci && \
    rm -rf ~/.npmrc

# Stage 3: Build
FROM dependencies as build

# Copy the rest of the application files
COPY --chown=appuser:appgroup --from=dependencies . .

# Lint and build the application
RUN npm run lint && npm run build

# Stage 4: Production
FROM base as production

# Copy necessary files and folders from the build stage
COPY --chown=appuser:appgroup --from=build /app/public /app/public
COPY --chown=appuser:appgroup --from=build /app/.next /app/.next
COPY --chown=appuser:appgroup --from=build /app/dist /app/dist
COPY --chown=appuser:appgroup --from=build /app/package*.json ./
COPY --chown=appuser:appgroup --from=build /app/entrypoint.sh ./entrypoint.sh
COPY --chown=appuser:appgroup --from=build /app/next-i18next.config.mjs ./next-i18next.config.mjs
COPY --chown=appuser:appgroup --from=build /app/next.config.mjs ./next.config.mjs

# Install only production dependencies
ARG NODE_AUTH_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc && \
    npm ci --omit=dev --omit=optional && \
    rm -rf ~/.npmrc

# Ensure entrypoint script is executable
RUN chmod +x ./entrypoint.sh

# Set user and expose port
USER appuser

# Labels for the image
LABEL org.opencontainers.image.authors="nico.benninger43@gmail.com"
LABEL org.opencontainers.image.source="https://github.com/easyflow-chat/easyflow-backend"
LABEL org.opencontainers.image.title="Backend Frontend"
LABEL org.opencontainers.image.description="Backend for Easyflow chat application"

# Set environment variables
ENV APPLICATION_ROOT="/app"

# Set entrypoint
ENTRYPOINT ["./entrypoint.sh"]