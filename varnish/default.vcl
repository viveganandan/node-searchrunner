vcl 4.0;
import std;
import directors;

backend searchrunner1 {
    .host = "searchrunner1";
    .port = "8000";
    .probe = {
        .url = "/flights/search";
        .timeout = 5s;
        .interval = 5s;
        .window = 5;
        .threshold = 3;
    }
}
backend searchrunner2 {
    .host = "searchrunner2";
    .port = "8000";
    .probe = {
        .url = "/flights/search";
        .timeout = 5s;
        .interval = 5s;
        .window = 5;
        .threshold = 3;
    }
}
backend searchrunner3 {
    .host = "searchrunner3";
    .port = "8000";
    .probe = {
        .url = "/flights/search";
        .timeout = 5s;
        .interval = 5s;
        .window = 5;
        .threshold = 3;
    }
}

sub vcl_init {
     new cluster1 = directors.round_robin();
     cluster1.add_backend(searchrunner1);
     cluster1.add_backend(searchrunner2);
     cluster1.add_backend(searchrunner3);
}

# The rule to use the 'cluster1' director - the load balancer.
sub vcl_recv {
   set req.backend_hint = cluster1.backend();
}
