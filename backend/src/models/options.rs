use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::FeatureReference;

#[derive(Serialize, Deserialize, Clone, TS)]
#[ts(export)]
pub struct FeatureOptions {
    // @TODO: only allow `KeyList` & `Wildcast`
    options: FeatureReference,

    // @TODO: only allow `Key`
    #[ts(optional)]
    default: Option<FeatureReference>,
}
