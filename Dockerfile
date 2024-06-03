FROM node:20-alpine as base

RUN npm uninstall -g yarn
RUN npm uninstall -g npm

RUN addgroup -g 2000 -S appgroup
RUN adduser -DH -s /sbin/nologin -u 2000 -G appgroup -S appuser

RUN mkdir /app
RUN chown -R appuser:appgroup /app

WORKDIR /app
COPY --chown=appuser:appgroup ./dist /app/dist
COPY --chown=appuser:appgroup ./.next /app/.next
COPY --chown=appuser:appgroup ./node_modules /app/node_modules
COPY --chown=appuser:appgroup ./public /app/public
COPY --chown=appuser:appgroup ./next-i18next.config.mjs /app/next-i18next.config.mjs
COPY --chown=appuser:appgroup ./next.config.mjs /app/next.config.mjs
COPY --chown=appuser:appgroup ./entrypoint.sh /app/entrypoint.sh

USER appuser
RUN echo '{"type": "module"}' > /app/package.json



LABEL org.opencontainers.image.authors="nico.benninger43@gmail.com"
LABEL org.opencontainers.image.source="https://github.com/Dragon437619/easyflow-frontend"
LABEL org.opencontainers.image.title="Easyflow Frontend"
LABEL org.opencontainers.image.description="Web Frontend for Easyflow chat application"


ENV NODE_ENV="production"

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh

