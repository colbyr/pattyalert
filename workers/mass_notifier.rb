require 'sidekiq'
require 'redis'
require './models/enthusiast.rb'

@@redis = Redis.connect

class Notifier
  include Sidekiq::Worker
  def perform(msg)
    Enthusiast.notify_all msg
  end
end
