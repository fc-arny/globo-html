class PagesController < ApplicationController
  layout :index
  private()
  def index
    case action_name
      when "new", "create"
        "application-without-leftside"
      when "index"
        "application-with-sidebars"
      else
        "application"
    end
  end
end
