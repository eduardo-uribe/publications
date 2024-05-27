+++
title = "Format dates in Tera the template engine for Rust"
date = 2024-05-26
+++

[Chrono documentation](https://docs.rs/chrono/0.4.38/chrono/format/strftime/index.html) for date and time formatting syntax.

For example, the above date was formatted with the following code: `{{ page.date | date(format="%b %d, %Y") }}`
