+++
title = "Static files in Rocket"
date = 2024-05-27
+++

Rocket [FileServer](https://api.rocket.rs/v0.5/rocket/fs/struct.FileServer)

```rust
use rocket::fs::FileServer;

#[launch]
fn rocket() -> _ {
    rocket::build()
         // serve files from `/www/static` at path `/public`
        .mount("/public", FileServer::from("/www/static"))
}

```
