                                  Prefix Verb   URI Pattern                                                                                       Controller#Action
             new_auth_users_user_session GET    /users/sign_in(.:format)                                                                          devise/sessions#new
                 auth_users_user_session POST   /users/sign_in(.:format)                                                                          devise/sessions#create
         destroy_auth_users_user_session DELETE /users/sign_out(.:format)                                                                         devise/sessions#destroy
            new_auth_users_user_password GET    /users/password/new(.:format)                                                                     devise/passwords#new
           edit_auth_users_user_password GET    /users/password/edit(.:format)                                                                    devise/passwords#edit
                auth_users_user_password PATCH  /users/password(.:format)                                                                         devise/passwords#update
                                         PUT    /users/password(.:format)                                                                         devise/passwords#update
                                         POST   /users/password(.:format)                                                                         devise/passwords#create
     cancel_auth_users_user_registration GET    /users/cancel(.:format)                                                                           users/registrations#cancel
        new_auth_users_user_registration GET    /users/sign_up(.:format)                                                                          users/registrations#new
       edit_auth_users_user_registration GET    /users/edit(.:format)                                                                             users/registrations#edit
            auth_users_user_registration PATCH  /users(.:format)                                                                                  users/registrations#update
                                         PUT    /users(.:format)                                                                                  users/registrations#update
                                         DELETE /users(.:format)                                                                                  users/registrations#destroy
                                         POST   /users(.:format)                                                                                  users/registrations#create
                        question_answers GET    /questions/:question_id/answers(.:format)                                                         answers#index
                                         POST   /questions/:question_id/answers(.:format)                                                         answers#create
                         question_answer GET    /questions/:question_id/answers/:id(.:format)                                                     answers#show
                                         PATCH  /questions/:question_id/answers/:id(.:format)                                                     answers#update
                                         PUT    /questions/:question_id/answers/:id(.:format)                                                     answers#update
                                         DELETE /questions/:question_id/answers/:id(.:format)                                                     answers#destroy
                               questions GET    /questions(.:format)                                                                              questions#index
                                         POST   /questions(.:format)                                                                              questions#create
                                question GET    /questions/:id(.:format)                                                                          questions#show
                                         PATCH  /questions/:id(.:format)                                                                          questions#update
                                         PUT    /questions/:id(.:format)                                                                          questions#update
                                         DELETE /questions/:id(.:format)



      user :{
                  "_id": {
                    "$oid": "659ae5b57a18fb273004d339"
                  },
                  "email": "mm@gmail.com",
                  "encrypted_password": "$2a$12$pWGba3m8Et7QLbHJboqE2eC.4gSbSN73tDxIOQUSaD6Gw.T3p.ILO",
                  "authentication_token": "",
                  "updated_at": {
                    "$date": "2024-01-07T17:56:05.989Z"
                  },
                  "created_at": {
                    "$date": "2024-01-07T17:56:05.989Z"
                  }
            }
