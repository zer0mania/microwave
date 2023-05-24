FROM quay.io/np22-jpg/fedora-npm AS devel
ARG NPM_BUILD="npm install"

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN $NPM_BUILD
COPY . .


FROM quay.io/np22-jpg/fedora-node AS release

LABEL maintainer="T"
LABEL summary="U"
LABEL description="E"

ENV NODE_ENV=production

USER node
WORKDIR /app
COPY --from=devel --chown=1000:1000 /app/node_modules node_modules
COPY --from=devel --chown=1000:1000 /app/src/index.js src/index.js
COPY --from=devel --chown=1000:1000 /app/package.json package.json

EXPOSE 8080/tcp

HEALTHCHECK --interval=5s --timeout=3s --start-period=5s \
  CMD /usr/bin/curl -f http://localhost:8080 || false

ENTRYPOINT [ "/usr/bin/node" ]
CMD [ "src/index.js" ]
