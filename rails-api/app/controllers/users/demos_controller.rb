# app/controllers/demos_controller.rb

class DemosController < ApplicationController
  def hello
    render layout: 'application'
  end
end

  
# class DemosController < ApplicationController
#   def hello
#     render 'hello'
#   end
# end
