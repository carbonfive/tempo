defmodule HarpsichordWeb.DataChannel do
  use Phoenix.Channel

  def join("data:climate", auth_msg, socket) do
    {:ok, socket}
  end
  def join("data:" <> _private_room_id, _auth_msg, socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_data", %{datum: datum}, socket) do
    IO.puts "IM HERE!!!!!!!!!"
    IO.inspect(datum)
    # broadcast_from! socket, "new_data", %{datum: datum}
    {:reply, {:ok, datum}, socket}
  end
  # def handle_in("new_data", %{"datum" => datum}, socket) do
  #   broadcast! socket, "new_data", %{datum: datum}
  #   {:noreply, socket}
  # end
end
