class CreateTaglists < ActiveRecord::Migration[6.1]
  def change
    create_table :taglists do |t|
      t.string :tag
      t.string :slug

      t.timestamps
    end
  end
end
