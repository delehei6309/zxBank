#!/usr/bin/env bash
  scp -r dist/* web@39.106.38.224:/home/web/webhive/nginx/vue/dist
  scp -r html/* web@39.106.38.224:/home/web/webhive/nginx/vue
  scp -r html/* web@39.106.38.224:/home/web/webhive/nginx/jq
