class CreateWordslists < ActiveRecord::Migration[6.1]
  def change
    create_table :wordslists do |t|
      t.string :name
      t.string :tag
      t.string :slug

      t.timestamps
    end
  end
end
