FROM node:20-alpine as base

#Variables
ARG NODE_AUTH_TOKEN


RUN npm uninstall -g yarn

RUN addgroup -g 2000 -S appgroup
RUN adduser -DH -s /sbin/nologin -u 2000 -G appgroup -S appuser

RUN mkdir /app
RUN chown -R appuser:appgroup /app


WORKDIR /app

#Is needed afterwards
COPY --chown=appuser:appgroup ./entrypoint.sh /app/entrypoint.sh
COPY --chown=appuser:appgroup ./public /app/public
COPY --chown=appuser:appgroup ./next-i18next.config.mjs /app/next-i18next.config.mjs
COPY --chown=appuser:appgroup ./next.config.mjs /app/next.config.mjs

#Gets deleted afterwards
COPY --chown=appuser:appgroup ./components /app/components
COPY --chown=appuser:appgroup ./config /app/config
COPY --chown=appuser:appgroup ./context /app/context
COPY --chown=appuser:appgroup ./enums /app/enums
COPY --chown=appuser:appgroup ./helpers /app/helpers
COPY --chown=appuser:appgroup ./hooks /app/hooks
COPY --chown=appuser:appgroup ./pages /app/pages
COPY --chown=appuser:appgroup ./server /app/server
COPY --chown=appuser:appgroup ./services /app/services
COPY --chown=appuser:appgroup ./styles /app/styles
COPY --chown=appuser:appgroup ./types /app/types
COPY --chown=appuser:appgroup ./.eslintrc.json /app/.eslintrc.json
COPY --chown=appuser:appgroup ./.prettierrc /app/.prettierrc
COPY --chown=appuser:appgroup ./ewc.d.ts /app/ewc.d.ts
COPY --chown=appuser:appgroup ./middleware.ts /app/middleware.ts
COPY --chown=appuser:appgroup ./package-lock.json /app/package-lock.json
COPY --chown=appuser:appgroup ./package.json /app/package.json
COPY --chown=appuser:appgroup ./postcss.config.json /app/postcss.config.json
COPY --chown=appuser:appgroup ./tailwind.config.ts /app/tailwind.config.ts
COPY --chown=appuser:appgroup ./tsconfig.json /app/tsconfig.json
COPY --chown=appuser:appgroup ./tsconfig.build.json /app/tsconfig.build.json


#Add node auth token to the npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc

#Install packages as in package-lock
RUN npm ci

#Linting
RUN npm run lint

#Build
RUN npm run build

#Remove packages
RUN rm -rf node_modules

#Install prod packages
RUN npm ci --omit=dev --omit=optional

#Remove unneeded files
RUN rm -r /app/components
RUN rm -r /app/config
RUN rm -r /app/context
RUN rm -r /app/enums
RUN rm -r /app/helpers
RUN rm -r /app/hooks
RUN rm -r /app/pages
RUN rm -r /app/server
RUN rm -r /app/services
RUN rm -r /app/styles
RUN rm -r /app/types
RUN rm -r /app/.eslintrc.json
RUN rm -r /app/.prettierrc
RUN rm -r /app/ewc.d.ts
RUN rm -r /app/middleware.ts
RUN rm -r /app/package-lock.json
RUN rm -r /app/package.json
RUN rm -r /app/postcss.config.json
RUN rm -r /app/tailwind.config.ts
RUN rm -r /app/tsconfig.json
RUN rm -r /app/tsconfig.build.json
RUN rm -r ~/.npmrc

#Uninstall npm not needed anymore
RUN npm uninstall -g npm


USER appuser

LABEL org.opencontainers.image.authors="nico.benninger43@gmail.com"
LABEL org.opencontainers.image.source="https://github.com/easyflow-chat/easyflow-backend"
LABEL org.opencontainers.image.title="Backend Frontend"
LABEL org.opencontainers.image.description="Backend for Easyflow chat application"

ENV APPLICATION_ROOT="/app"
ENV NODE_ENV="production"

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh