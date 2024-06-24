# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_24_232026) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "aquaria", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "deleted_at"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "name"], name: "index_aquaria_on_user_id_and_name", unique: true
    t.index ["user_id"], name: "index_aquaria_on_user_id"
  end

  create_table "devise_api_tokens", force: :cascade do |t|
    t.string "resource_owner_type", null: false
    t.bigint "resource_owner_id", null: false
    t.string "access_token", null: false
    t.string "refresh_token"
    t.integer "expires_in", null: false
    t.datetime "revoked_at"
    t.string "previous_refresh_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["access_token"], name: "index_devise_api_tokens_on_access_token"
    t.index ["previous_refresh_token"], name: "index_devise_api_tokens_on_previous_refresh_token"
    t.index ["refresh_token"], name: "index_devise_api_tokens_on_refresh_token"
    t.index ["resource_owner_type", "resource_owner_id"], name: "index_devise_api_tokens_on_resource_owner"
  end

  create_table "dimensions", force: :cascade do |t|
    t.integer "height_cm"
    t.integer "width_cm"
    t.integer "length_cm"
    t.datetime "deleted_at"
    t.bigint "aquarium_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aquarium_id"], name: "index_dimensions_on_aquarium_id"
  end

  create_table "embedded_servers", force: :cascade do |t|
    t.string "name"
    t.string "mac_address"
    t.datetime "deleted_at"
    t.bigint "aquarium_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aquarium_id"], name: "index_embedded_servers_on_aquarium_id"
  end

  create_table "numeric_values", force: :cascade do |t|
    t.decimal "value", precision: 10, scale: 2, null: false
    t.datetime "deleted_at"
    t.bigint "range_sensor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["range_sensor_id"], name: "index_numeric_values_on_range_sensor_id"
  end

  create_table "on_off_actuators", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.datetime "publish_data_to_server_interval", null: false
    t.integer "embedded_actuator_pin", null: false
    t.datetime "deleted_at"
    t.bigint "aquarium_id", null: false
    t.bigint "on_off_sensor_id"
    t.bigint "range_sensor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aquarium_id"], name: "index_on_off_actuators_on_aquarium_id"
    t.index ["on_off_sensor_id"], name: "index_on_off_actuators_on_on_off_sensor_id"
    t.index ["range_sensor_id"], name: "index_on_off_actuators_on_range_sensor_id"
  end

  create_table "on_off_sensors", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.datetime "publish_data_to_server_interval", null: false
    t.datetime "deleted_at"
    t.bigint "aquarium_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "sensor_type", null: false
    t.index ["aquarium_id"], name: "index_on_off_sensors_on_aquarium_id"
  end

  create_table "on_off_values", force: :cascade do |t|
    t.boolean "value", default: false, null: false
    t.datetime "deleted_at"
    t.bigint "on_off_sensor_id"
    t.bigint "on_off_actuator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["on_off_actuator_id"], name: "index_on_off_values_on_on_off_actuator_id"
    t.index ["on_off_sensor_id"], name: "index_on_off_values_on_on_off_sensor_id"
  end

  create_table "range_sensors", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.datetime "publish_data_to_server_interval", null: false
    t.decimal "min_value", null: false
    t.decimal "max_value", null: false
    t.datetime "deleted_at"
    t.bigint "aquarium_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aquarium_id"], name: "index_range_sensors_on_aquarium_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "oauth_provider"
    t.string "oauth_uid"
    t.boolean "admin", default: false, null: false
    t.datetime "deleted_at"
    t.string "name"
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  add_foreign_key "aquaria", "users"
  add_foreign_key "dimensions", "aquaria"
  add_foreign_key "embedded_servers", "aquaria"
  add_foreign_key "numeric_values", "range_sensors"
  add_foreign_key "on_off_actuators", "aquaria"
  add_foreign_key "on_off_actuators", "on_off_sensors"
  add_foreign_key "on_off_actuators", "range_sensors"
  add_foreign_key "on_off_sensors", "aquaria"
  add_foreign_key "on_off_values", "on_off_actuators"
  add_foreign_key "on_off_values", "on_off_sensors"
  add_foreign_key "range_sensors", "aquaria"
end
