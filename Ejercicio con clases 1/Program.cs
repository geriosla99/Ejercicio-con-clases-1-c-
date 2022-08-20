using System;

namespace Ejercicio_con_clases_1
{
    class Program
    {
        static void Main(string[] args)
        {
            //Variables locales 
            string nombreAr, apellidoAr, nip;

            Console.WriteLine("Bienvenido a MonsterInc.\n");
            Console.WriteLine("Ingresen los siguientes campos que se solicitan: \n");

            Console.WriteLine("Nombre: ");
            nombreAr = Console.ReadLine();
            Console.WriteLine("Apellido: ");
            apellidoAr = Console.ReadLine();
            Console.WriteLine("Digame su nip para asignarlo a su tarjeta bancaria: ");
            nip = Console.ReadLine();

            //Instanciamos a la clase empleado 
            Empleado empleado = new Empleado(nombreAr, apellidoAr);

            empleado.Nip = nip;

            //Mostrar la informacion del objeto 
            Console.WriteLine(empleado.ToString());

        }
    }
    class Empleado
    {
        //Campos 
        private string nombre, apellido, id, locker, banco, nip;

        //Constructor
        public Empleado(string nombrePa, string apellidoPa)
        {
            nombre = nombrePa;
            apellido = apellidoPa;

            //Llamando a los métodos  para generar 
            id = GenerarID();
            locker = GenerarLocker();
            banco = AsignarBanco();
        }

        //Instanciamos a Random
        Random random = new Random();

        //Propiedades
        public string Nip
        {
            set => nip = value;
        }

        //Método
        private string GenerarID()
        {
            
            //variables
            int i, numero;
            string id = "";

            for (i = 0; i < 10; i++)
            {
                numero = random.Next(10);

                id += numero.ToString();
            }
            return id;
        }
        private string GenerarLocker()
        {

            //variables
            int i, numero;
            string locker = "";

            for (i = 0; i < 2; i++)
            {
                numero = random.Next(10);

                locker += numero.ToString();
            }
            return locker;
        }
        private string AsignarBanco()
        {
            //variables
            int asignarBanco;
            string banco = "";

                asignarBanco = random.Next(1, 3);

            switch (asignarBanco)
            {
                case 1:
                    banco = "Santander";
                    break;
                case 2:
                    banco = "BBVA";
                    break;
            }
            return banco;
        }

        public override string ToString()
        {
            string mensaje = "";

            mensaje = "Empleado: " + nombre + " " + apellido + "\nNúmero de empleado: " + id + "\nLocker No. " + locker + "\nBanco asignado: " + banco;

            return mensaje;
        }
    }
}
