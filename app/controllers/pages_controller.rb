class PagesController < ApplicationController
  layout :layout

  def profile

  end

  private()
  def layout
    case action_name
      when "new", "create", "profile"
        "application-without-leftside"
      when "index"
        "application-with-sidebars"
      else
        "application"
    end
  end
end
