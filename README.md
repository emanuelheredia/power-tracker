# AccesoriosParaVehiculos App - README

![AccesoriosVehiculo App](src/assets/imgReadme/Captura%20desde%202023-08-21%2020-32-11.png)

[Acceso a App](https://power-tracker.vercel.app/)

## Descripción del Proyecto

AccesoriosVehiculo App es una aplicación web diseñada para un local que vende accesorios para camionetas y vehículos. Esta aplicación está construida utilizando React, Redux, librerías externas, Firebase Firestore y CSS para la interfaz de usuario.

El objetivo principal de la aplicación es permitir que el administrador del local pueda gestionar y visualizar los precios de los productos que se venden en la tienda. Para lograr esto, la aplicación ofrece las siguientes funcionalidades:

-   **Carga y Extracción de Precios:** Los clientes pueden cargar archivos Excel que reciben de sus proveedores. La aplicación extrae automáticamente la información relevante de estos archivos, estructura los precios de los productos y almacena estos datos en Firebase Firestore.

-   **Sección de Lista de Precios:** La aplicación muestra todas las listas de precios almacenadas en la base de datos en forma de tarjetas individuales para cada producto. Cada tarjeta incluye detalles sobre el producto, como información, imágenes y precios actualizados.

-   **Filtrado de Productos:** Los visitantes pueden filtrar los productos en función de categoría, color, código de producto o vehículo al que corresponden. Esto facilita la búsqueda y selección de productos específicos.

-   **Sección de Administrador:** Los administradores tienen acceso a una sección segura de la aplicación después de autenticarse con su usuario y contraseña. En esta sección, pueden subir nuevas listas de precios. La aplicación se encarga de eliminar las listas anteriores y almacenar las nuevas, garantizando que los visitantes siempre vean los precios más actualizados.

## Diseño Responsive

La AccesoriosParaVehiculos App ha sido diseñada de manera completamente responsive. Esto significa que la aplicación se adapta de manera óptima a diferentes tamaños de pantalla, incluyendo dispositivos móviles, tablets y computadoras de escritorio. Los visitantes podrán disfrutar de una experiencia fluida y funcional en cualquier dispositivo que utilicen.

## Próximas Funcionalidades

Aunque esta primera etapa del proyecto ha sido completada satisfactoriamente para permitir que la tienda comience a utilizarla, estamos emocionados por anunciar que se están planificando nuevas funcionalidades y mejoras en el futuro cercano. Algunas de las adiciones planeadas incluyen:

-   **Carrito de Compra:** Implementaremos un sistema de carrito de compra que permitirá a los visitantes seleccionar productos y crear órdenes de compra. Estas órdenes podrán ser revisadas y enviadas al administrador para su procesamiento.

-   **Notificaciones y Alertas:** Integraremos un sistema de notificaciones y alertas para informar a los usuarios sobre actualizaciones de precios, ofertas especiales y otros eventos relevantes.

-   **Mejoras en la Interfaz de Usuario:** Continuaremos optimizando la interfaz de usuario para brindar una experiencia aún más fluida y atractiva para los usuarios.

-   **Sugerencias de los Usuarios:** Estamos abiertos a recibir sugerencias de la tienda y los usuarios para mejorar y ampliar las funcionalidades de la aplicación de acuerdo a sus necesidades.

## Capturas de Pantalla

![Captura de Pantalla 1](src/assets/imgReadme/Captura%20desde%202023-08-21%2020-32-11.png)
_Vista de la sección de Lista de Precios con tarjetas individuales para cada producto._

![Captura de Pantalla 2](src/assets/imgReadme/Captura%20desde%202023-08-21%2020-31-32.png)
_Vista de la sección de Filtrado de Productos, permitiendo a los visitantes buscar productos específicos._

![Captura de Pantalla 3](src/assets/imgReadme/Captura%20desde%202023-08-21%2020-31-40.png)
_Vista de la sección de Administrador, donde se pueden subir nuevas listas de precios._

![Captura de Pantalla 4](src/assets/imgReadme/Captura%20desde%202023-08-21%2020-31-59.png)
_Vista de la sección de Administrador, donde se pueden subir nuevas listas de precios._

## Tecnologías Utilizadas

React: El framework utilizado para construir la interfaz de usuario de la aplicación.

Redux: Utilizado para la administración del estado global de la aplicación, permitiendo un manejo eficiente de los datos.

Librerías Externas: Se han empleado librerías de terceros para mejorar la experiencia del usuario y agilizar el desarrollo.

Firebase Firestore: La base de datos en la nube utilizada para almacenar y sincronizar los datos de los productos y las listas de precios.

CSS: Los estilos y la presentación visual de la aplicación se implementan utilizando hojas de estilo en cascada.

## Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Navega a la carpeta del proyecto: cd AccesoriosVehiculoApp.
   3 .Instala las dependencias: npm install.
3. Crea un proyecto en Firebase y configura la conexión con Firestore.
4. Copia la configuración de Firebase en el archivo de configuración (por ejemplo, src/firebaseConfig.js).
5. Ejecuta la aplicación: npm start.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras errores o deseas agregar nuevas características, siéntete libre de abrir un issue o enviar un pull request.

## Autores

Este proyecto ha sido desarrollado por mi, Emanuel Heredia y está disponible bajo la licencia.

# Mis Redes :

-   [GITHUB](https://github.com/emanuelheredia)
-   [LINKEDIN](https://www.linkedin.com/in/emanuel-heredia-41749421a/)

Gracias por usar AccesoriosVehiculo App. Esperamos que esta aplicación sea útil para gestionar los precios de los productos de manera efectiva. Si tienes alguna pregunta, sugerencia o necesitas asistencia, no dudes en contactarnos. ¡Estamos ansiosos por seguir mejorando la aplicación y brindarte nuevas funcionalidades emocionantes en el futuro cercano!
