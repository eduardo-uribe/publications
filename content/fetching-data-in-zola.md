+++
title = "Fetching data in Zola"
date = 2024-09-25

[extra]
thread = 8
+++

In Zola we can fetch data ([remote content](https://www.getzola.org/documentation/templates/overview/#remote-content) as titled in the documentation) using the [`load_data()`](https://www.getzola.org/documentation/templates/overview/#load-data) function.

```
{% set comments = load_data(
    url="https://commentingsystem.com/api/v1/thread/1",
    headers=["origin=https://eduardouribe.com"]
    ) %}
```
