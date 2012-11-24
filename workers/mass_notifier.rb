require 'sidekiq'
require 'redis'
require './models/enthusiast.rb'

@@redis = Redis.connect

class Notifier
  include Sidekiq::Worker
  def perform(msg, recipient=:all)
    if recipient == :all
      Enthusiast.notify_all msg
    else
      recipient.notify msg
    end

  end
end
