+++
title = "Template files in Rocket"
date = 2024-05-28
+++

Rocket [Templates](https://rocket.rs/guide/v0.5/responses/#templates) with the [rocket_dyn_templates](https://api.rocket.rs/v0.5/rocket_dyn_templates/) crate.

```toml
[dependencies]
rocket = "0.5.1"
rocket_dyn_templates = { version = "0.2.0", features = ["tera"] }
```

```rust
#[macro_use] extern crate rocket;
use rocket_dyn_templates::{Template, context};

#[get("/")]
fn dashboard() -> Template {
    Template::render("dashboard", context! { username: "eduardo" })
}

#[launch]
fn rocket() -> _ {
    // add templating system
    rocket::build().attach(Template::fairing())
    // register routes
    .mount("/dashboard", routes![dashboard])
}
```
