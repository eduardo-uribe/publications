+++
title = "Generate a random API key in Rust"
date = 2024-09-28

[extra]
thread = 3
+++

I'm slowly going to migrate my saas product [commentingsystem.com](https://commentingsystem.com) from Next.js to [Rust](https://www.rust-lang.org/) using the Rust web framework [Rocket](https://rocket.rs).

One of the task I needed to clone in Rust was generating a random public api key. From the [Rust Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/algorithms/randomness.html) I found this resource, in the section titled [Create random passwords from a set of alphanumeric characters](https://rust-lang-nursery.github.io/rust-cookbook/algorithms/randomness.html#create-random-passwords-from-a-set-of-alphanumeric-characters).

```
use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;

fn main() {
    let rand_string: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(30)
        .map(char::from)
        .collect();

    println!("{}", rand_string);
}
```

Here's how I'm using it in my [Rocket](https://rocket.rs) web application.

```
use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;

#[post("/")]
async fn register_domain() -> Template {
    let public_api_key = generate_a_random_public_api_key();

    Template::render("dashboard/register-domain", context! { public_api_key })
}

fn generate_a_random_public_api_key() -> String {
    let rand_string: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(30)
        .map(char::from)
        .collect();

    rand_string
}
```
