FROM ruby:alpine

RUN apk update \
    && apk upgrade \
    && apk add \
      g++ \
      make \
      cmake \
    && rm -rf /var/cache/apk/*

RUN gem install sinatra thin github-markup commonmarker --no-ri --no-rdoc