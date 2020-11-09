class ChangeColumnToString < ActiveRecord::Migration[6.0]
  def change
    change_column :user_videos, :video_id, :string
  end
end
