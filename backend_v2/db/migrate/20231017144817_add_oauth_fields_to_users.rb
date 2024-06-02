# frozen_string_literal: true

class AddOauthFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.string :oauth_provider, null: true
      t.string :oauth_uid, null: true
    end
  end
end
