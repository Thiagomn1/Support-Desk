import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/TicketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState("iPhone")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset)
      navigate("/tickets")
    }

    dispatch(reset)
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = event => {
    event.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} className="form-control" disabled></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" value={email} className="form-control" disabled></input>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={event => setProduct(event.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
              <option value="Macbook Pro">Macbook Pro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Describe your issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Your message"
              value={description}
              onChange={event => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className="from-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
