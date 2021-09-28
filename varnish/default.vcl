vcl 4.0;

backend node {
  .host = "node";
  .port = "3000";
}


sub vcl_backend_response {
  set beresp.do_esi = true;
  set beresp.ttl = 10s;
}

acl purge {
        "node";
}

sub vcl_recv {
        # allow PURGE from node

        if (req.method == "PURGE") {
                if (!client.ip ~ purge) {
                        return(synth(405,"Not allowed."));
                }
                return (purge);
        }
}
