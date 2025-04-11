use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::{Feature, FeatureReference, MaybeVec};

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FeatureDefinition {
    #[ts(optional)]
    name: Option<String>,

    #[ts(optional)]
    description: Option<String>,

    #[ts(optional, inline)]
    require: Option<MaybeVec<String>>,

    #[ts(optional, inline)]
    add: Option<MaybeVec<Feature>>,

    #[ts(optional, inline)]
    remove: Option<MaybeVec<FeatureReference>>,
}

impl FeatureDefinition {
    pub fn new() -> Self {
        FeatureDefinition {
            name: Option::None,
            description: Option::None,
            require: Option::None,
            add: Option::None,
            remove: Option::None,
        }
    }
}
