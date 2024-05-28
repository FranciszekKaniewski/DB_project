export const sqlQuery ={
    free_time_in_min:`
    WITH periods AS (
    SELECT 
            GREATEST(startDate, ?) AS adjusted_start,
            LEAST(endDate, ?) AS adjusted_end,
            type
        FROM task
        WHERE startDate < ? AND endDate > ?
        AND id != ?
    ),
    busy_minutes AS (
        SELECT 
            type,
            SUM(TIMESTAMPDIFF(MINUTE, adjusted_start, adjusted_end)) AS total_busy_minutes
        FROM periods
        WHERE type = 'hard'
        GROUP BY type
    ),
    soft_tasks AS (
        SELECT COUNT(*) AS soft_task_count
        FROM periods
        WHERE type = 'soft'
    )
    SELECT 
        TIMESTAMPDIFF(MINUTE, ?, ?) - 
        COALESCE((SELECT total_busy_minutes FROM busy_minutes WHERE type = 'hard'), 0) -
        (SELECT soft_task_count * 15 FROM soft_tasks) AS free_minutes;
        `,
    where_hard_touch:`
        ((startDate <= :start AND endDate >= :start) OR
        (startDate <= :end AND endDate >= :end) OR
        (startDate >= :start AND endDate <= :end) OR
        (startDate <= :start AND endDate >= :end))
        AND type = 'hard' AND id != :id
    `,
    free_time_in_soft_in_min:`
        WITH periods AS (
            SELECT 
                    GREATEST(startDate, ?) AS adjusted_start,
                    LEAST(endDate, ?) AS adjusted_end,
                    type
                FROM task
                WHERE startDate < ? AND endDate > ?
                AND id != ?
            ),
            busy_minutes AS (
                SELECT 
                    type,
                    SUM(TIMESTAMPDIFF(MINUTE, adjusted_start, adjusted_end)) AS total_busy_minutes
                FROM periods
             WHERE type = 'hard'
                GROUP BY type
         ),
            soft_tasks AS (
                SELECT COUNT(*) AS soft_task_count
                FROM periods
                WHERE type = 'soft'
            )
            SELECT 
                14 + TIMESTAMPDIFF(MINUTE, ?, ?) - 
             COALESCE((SELECT total_busy_minutes FROM busy_minutes WHERE type = 'hard'), 0) -
             (SELECT soft_task_count * 15 FROM soft_tasks) - TIMESTAMPDIFF(MINUTE, ?, ?) AS free_minutes;`
    ,
};