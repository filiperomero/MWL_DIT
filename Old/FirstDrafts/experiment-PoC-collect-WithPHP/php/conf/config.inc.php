<?php

/* Root Directory For All Files */
define("ROOT_DIR", dirname( dirname(__FILE__) ) );

/* database constants */
define("DB_HOST", "remote-mysql3.servage.net" );	// set database host
define("DB_USER", "filipe" ); 	// set database user
define("DB_PASS", "yvxYywqcAF2H6ZbW" ); 		// set database password
define("DB_PORT", 3306);					// set database port
define("DB_NAME", "filipe" );		// set database name
define("DB_CHARSET", "utf8" ); 				// set database charset
define("DB_DEBUGMODE", true ); 				// set database charset

/* actions for the STATISTICS REST resource */
define("ACTION_AGE_STATISTICS", "AGE");
define("ACTION_AGE_STATISTICS_BY_NATIONALITY", "AGE_BY_NAT");
define("ACTION_TASKS_STATISTICS", "TASKS");
define("ACTION_QUESTIONNAIRES_STATISTICS", "QUEST");
define("ACTION_QUESTIONNAIRES_STATISTICS_BY_TASK", "QUEST_BY_TASK");

/* general message */
define("GENERAL_MESSAGE_LABEL", "message");
define("GENERAL_CLIENT_ERROR", "client error: modify the request");
define("GENERAL_NOCONTENT_MESSAGE", "no-content");
define("GENERAL_INVALID_INPUT", "Invalid input");
define("GENERAL_INVALIDROUTE", "Requested route does not exist");

/* general labels */
define("HEADERS_USERNAME", "username");
define("HEADERS_PASSWORD", "password");
define("HEADERS_CONTENT_TYPE", "Content-Type");
define("PARAM_NATIONALITY", "nationality");
define("PARAM_TASK_ID", "taskID");

/* content type */
define("JSON", "application/json");
define("XML", "application/xml");

/* Users */
/* Authentication mechanism consists in adding in the headers request the keys HEADERS_USERNAME and HEADERS_PASSWORD */
$GLOBALS['users'] = array	(
							"ROMERO" => "b516d4610281f9426f7fbec8857d1268f8797e43",	// password without hash: "nozmoscada"
							"FILIPE" => "093ff25d4dc19745a1ecd5091a66c6a1bf6c35d2"	// password without hash: "benfica"
							);

/* HTTP status codes */
define("HTTPSTATUS_OK", 200);
define("HTTPSTATUS_NOCONTENT", 204);
define("HTTPSTATUS_BADREQUEST", 400);
define("HTTPSTATUS_UNAUTHORIZED", 401);

?>