defmodule HarpsichordWeb.AmbientDatum do
  use HarpsichordWeb.Web, :model

  schema "ambient_data" do
    field :light, :float
    field :sound, :float

    timestamps
  end

  @required_fields ~w(light sound)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
