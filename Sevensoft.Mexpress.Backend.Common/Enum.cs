namespace Sevensoft.Mexpress.Backend.Common
{
    public class Enum
    {
        public enum ApplicationTypes
        {
            JavaScript = 0,
            NativeConfidential = 1
        }

        public enum Operation
        {
            Save,
            List,
            Get,
            Delete,
            Login,
            Import,
            Resumen,
            Report,
            PasswordChange,
            ImportExcel,
            Generatem,
            Create,
            DeleteSpecific,
        }

        public enum Status
        {
            Success,
            Failed
        }
     
        public enum User_Option
        {
            None,
            ListarUsuarioConsulta = 20
        } 

        public enum Ubicacion_Option 
        {
            None,
            Opcion_Obtiene_Ubicacion_Por_Sistema = 3

        }


        public enum Agreement_Option
        {
            None,
            Process_Work_Table
        }

         public enum Pay_Option
        {
            None,
            Pending,
            Revision,
            Finished
        }
    } 
}
