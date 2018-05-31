Rails.application.routes.draw do
  root to: "calculator#index"

  namespace :api, defaults: { format: "json" } do
    scope module: :v1 do
      get "calculator/eval", to: "calculator#evaluate"
    end
  end
end
