// export class UsuarioDTO {
//   constructor(user, cart) {
//     this.id = user._id
//     this.first_name = user.first_name.toUpperCase()
//     this.last_name = user.last_name.toUpperCase()
//     this.name = `${user.first_name} ${user.last_name}`
//     this.email = user.email.split("@")[0]
//     this.role = user.role.toUpperCase()
//     this.cart = cart.products.map(item => ({
//       title: item.product.title,
//       price: item.product.price,
//       quantity: item.quantity
//     }))
//   }
// }

export default function userTokenDTO(user) {
    const payload = {
    _id: user._id,
    email: user.email,
    username: user.email.split("@")[0].toUpperCase(),
    name:user.first_name.toUpperCase()+" "+user.last_name.toUpperCase(),
    smtp_client:user.email.split("@")[1],
    //first_name: user.first_name.toUpperCase(),
    //last_name: user.last_name.toUpperCase(),
    role: user.role.toUpperCase(),
    cartID: user.cartID
    }

  return payload
    
  }
