import { z } from "zod";
import { SQL_QUERY } from "../constants/sql-query"

import { executeQuery } from "../utils/helper"

const getMany = async () => {
    // const result = await executeQuery<z.infer<typeof bookSchemaOracle>>(SQL_QUERY.USER.GET_MANY);
    const result = await executeQuery<any>(SQL_QUERY.USER.GET_MANY);
    return result.rows;
}



export default {
    getMany
} as const;