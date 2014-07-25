class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.datetime :date_time
      t.text :description
      t.float :amount, null: false 
      t.string :comment
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :expenses, :user_id
  end
end
