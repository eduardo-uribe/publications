+++
title = "Date formatting in Tera"
date = 2024-05-26
+++

[Chrono documentation](https://docs.rs/chrono/0.4.38/chrono/format/strftime/index.html) for date and time formatting syntax. For example, the date above was formatted with the following code:

```rust
{{ page.date | date(format="%b %d, %Y") }}
```
