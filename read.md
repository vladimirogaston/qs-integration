# PRE-CONDICIONES que se ASUMEN COMO VERDADERAS para el correcto funcionamiento de la interfaz
# de integracion de PRODUCTOS entre SoftlandERP y ZohoCRM

PRE:01- La columna USR_STINTE_ARTCOD de la table USR_STINTE en la BDI representa el Product_Code en Zoho CRM Products

PRE:02- La columna USR_STINTE_ARTCOD de la table USR_STINTE en la BDI es UNIQUE

PRE:03- AL actualizarse o crearse en la BDI nuevos datos, las columnas USR_VTMCLH_UPDCRM y USR_VTMCLH_LOGGER poseeran el valor NULL

PRE:04- La conexion con la BDI no se caerá

PRE:05- La conexion con el Zoho de QS no se caerá

# POST-CONDICIONES

POST:01- Al migrar un registro de la BDI a ZOHO de forma satisfactoria, la columna USR_VTMCLH_UPDCRM se actualizará con el CHAR 's'

POST:02- Al fallar la migración del registro de la BDI a ZOHO, la columna USR_VTMCLH_LOGGER
se actualizará con el log de error.

# Mapeo de columnas entre los registros en la BDI y el API Products ZohoCRM
# --- BDI -----------#----- ZOHO ----------#
USR_STINTE_ARTCOD    | Product_Code
USR_STINTE_ARTCOD    | Product_Name
USR_STINTE_DESCR     | Description 
USR_STINTE_STOCKS    | Qty_in_Stock

# FLAGS
USR_VTMCLH_LOGGER    | actualizar con msg error en caso de fallar la migración 
USR_VTMCLH_UPDCRM    | actualizar con 's' en caso de migrar de forma satisfactoria