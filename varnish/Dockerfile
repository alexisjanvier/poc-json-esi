FROM cooptilleuls/varnish:6.0-alpine AS varnish

COPY default.vcl /usr/local/etc/varnish/default.vcl

CMD ["varnishd", "-F", "-f", "/usr/local/etc/varnish/default.vcl", "-p", "feature=+esi_disable_xml_check", "-p", "feature=+esi_ignore_other_elements"]
