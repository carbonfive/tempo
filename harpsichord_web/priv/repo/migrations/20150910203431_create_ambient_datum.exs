defmodule HarpsichordWeb.Repo.Migrations.CreateAmbientDatum do
  use Ecto.Migration

  def change do
    create table(:ambient_data) do
      add :light, :float
      add :sound, :float

      timestamps
    end
  end
end
