// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use loki_builder_lib::*;

#[tokio::main]
async fn main() -> Result<()> {
    run()
}
