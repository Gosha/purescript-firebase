module Web.Firebase.Aff.Read
(
  onceValue
, valueAt
) where
import Prelude (pure, bind, ($))

import Foreign (Foreign)
import Effect.Aff (Aff)

import Web.Firebase as FB
import Web.Firebase.Types as FBT
import Web.Firebase.DataSnapshot (val)
import Web.Firebase.Aff (once)

valueAt :: FBT.Firebase -> Aff Foreign
valueAt ref = do
       snap <- onceValue ref
       pure $ (val snap)

onceValue :: FBT.Firebase -> Aff FBT.DataSnapshot
onceValue root = once FB.Value root

