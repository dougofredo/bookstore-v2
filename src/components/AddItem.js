const App = () => {

  let [cart, setCart] = useState([])

  let localCart = localStorage.getItem("cart");

  const addItem = (item)  =>   {}
  const updateItem = (itemID, amount) => {}
  const removeItem = (itemID) => {}

  //this is called on component mount
  useEffect(() => {
    //turn it into js
    localCart = JSON.parse(localCart);
    //load persisted cart into state if it exists
    if (localCart) localStorage.setItem("cart", localCart)

  }, []) //the empty array ensures useEffect only runs once



  return <div></div>
}
