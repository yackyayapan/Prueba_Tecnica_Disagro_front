import styles from "../../styles/Home.module.css";
import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    date_hour: "",
    discounts: [],
    services: [],
    product: []
  });


  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
        let updatedData = { ...formData };
        let updatedDiscounts = [...formData.discounts];

        // Si se selecciona o deselecciona un producto, actualizar los descuentos
        if (name === 'product') {
            const productId = parseInt(value);
            if (checked) {
                // Si se selecciona un producto, agregar descuento 3
                updatedDiscounts.push(5);
            } else {
                // Si se deselecciona un producto, eliminar el descuento correspondiente
                const index = updatedDiscounts.indexOf(5);
                if (index !== -1) {
                    updatedDiscounts.splice(index, 1);
                }
            }
        }

        // Si se selecciona o deselecciona un servicio, actualizar los descuentos
        if (name === 'services') {
            const serviceId = parseInt(value);
            if (checked) {
                // Si se selecciona un servicio, agregar descuento 5
                updatedDiscounts.push(3);
            } else {
                // Si se deselecciona un servicio, eliminar el descuento correspondiente
                const index = updatedDiscounts.indexOf(3);
                if (index !== -1) {
                    updatedDiscounts.splice(index, 1);
                }
            }
        }

        // Actualizar los datos del formulario con los cambios realizados
        updatedData = {
            ...updatedData,
            [name]: checked ? [...updatedData[name], parseInt(value)] : updatedData[name].filter(item => item !== parseInt(value)),
            discounts: updatedDiscounts
        };
        setFormData(updatedData);
    } else {
        setFormData({
            ...formData,
            [name]: value
        });
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, email, lastname, date_hour } = formData;

    if (!firstname || !email || !lastname || !date_hour) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    console.log("Form data:", formData);
    
    try {
        const response = await fetch('http://localhost:8000/api/create_customer', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('¡Datos enviados exitosamente!');
            // Aquí podrías realizar alguna acción adicional después de enviar los datos
        } else {
            throw new Error('Error al enviar los datos');
        }
      } catch (error) {
          console.error('Error:', error);
          alert('Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.');
      }
  };

  return (
    <>
    <div className={styles.container_form}>
      <form onSubmit={handleSubmit}>
        
        <div className={styles.containers_forms}>
          <div>
              <div className={styles.form_div}>
                    <div className={styles.circle}>1</div>
                    <h2>Ingrese su información</h2>
                  </div>

                  <div className={styles.form}>
                    <div>
                      <label className={styles.label} htmlFor="firstname">
                        Nombre:
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastname">Apellido:</label>
                      <input
                        className={styles.input}
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Correo Electrónico:</label>
                      <input
                        className={styles.input}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  
                    <div>
                      <label htmlFor="date_hour">Fecha:</label>
                      <input
                        className={styles.input}
                        type="date"
                        id="date_hour"
                        name="date_hour"
                        value={formData.date_hour}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
              </div>

              <div>
                <div className={styles.form_div}>
                  <div className={styles.circle}>2</div>
                  <h2>Seleccione Servicios y productos de su interés</h2>
                </div>

                
                <div className={styles.form}>
                  <div className={styles.text}>
                    <p>Servicios y/o Productos</p>
                    <p> Seleccionados</p>
                  </div>
                  <div>
                      <input
                          type="checkbox"
                          id="product1"
                          name="product"
                          value="1"
                          checked={formData.product.includes(1)}
                          onChange={handleChange}
                      />
                      <label htmlFor="product1">Producto 1</label>
                    </div>
                  <div>
                    <input
                        type="checkbox"
                        id="product2"
                        name="product"
                        value="2"
                        checked={formData.product.includes(2)}
                        onChange={handleChange}
                    />
                    <label htmlFor="product2">Producto 2</label>
                  </div>
                  <div>
                    <input
                        type="checkbox"
                        id="service1"
                        name="services"
                        value="1"
                        checked={formData.services.includes(1)}
                        onChange={handleChange}
                    />
                    <label htmlFor="service1">Servicio 1</label>
                  </div>
                  <div>
                      <input
                          type="checkbox"
                          id="service2"
                          name="services"
                          value="2"
                          checked={formData.services.includes(2)}
                          onChange={handleChange}
                      />
                      <label htmlFor="service2">Servicio 2</label>
                  </div>
                </div>
              </div>


          </div>

        <div className={styles.div_button}>
          <button className={styles.button} type="submit">
            CONFIRMAR ASISTENCIA
          </button>
        </div>
      </form>
    </div>
  </>
  );
}



{/* <div className={styles.form_desing}>
              <div className={styles.form_div_two}>
                <div className={styles.search_div}>
                  <input
                  className={styles.input}
                  placeholder="Buscar servicios y productos"
                  />
                </div>
              </div>
              <p>Servicios y/o Productos</p>
              <p>Seleccionados:</p>
            </div> */}