FROM node:18 as build
WORKDIR /app
RUN apt-get update \
    && apt-get install -y \
    libxshmfence1 \
    libnss3 \
    libx11-xcb1 \
    libcups2 \
    libxss1 \
    libxcomposite1 \
    libxdamage1 \
    libxtst6 \
    libxi6 \
    libxcb1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpango1.0-0 \
    libcairo2 \
    chromium \
    && rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_PATH /usr/bin/chromium
COPY package.json .
RUN npm install

FROM build as run
COPY app.js .
CMD ["npm","start"]
