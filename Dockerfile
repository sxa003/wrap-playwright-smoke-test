FROM docker-registry.hq.local/ioof/rhel7_nginx:latest

RUN yum install -q -y nginx-module-perl && yum clean all

EXPOSE 8443
EXPOSE 8446

COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist /app

RUN echo "load_module modules/ngx_http_perl_module.so;" >> /tmp/nginx.conf \
 && echo "env STACK_NAME;" >> /tmp/nginx.conf \
 && echo "" >> /tmp/nginx.conf \
 && cat /etc/nginx/nginx.conf >> /tmp/nginx.conf \
 && mv /tmp/nginx.conf /etc/nginx/nginx.conf