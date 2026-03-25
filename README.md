# Code Problem Setting Service


## How routing is working in the project

- /api/v1/problems/ping
   - because the routes starts with /
   /api      -> /v1       -> /problems      ->/ping
   apiRouter -> v1Router -> problemRouter -> problemController -> service layer