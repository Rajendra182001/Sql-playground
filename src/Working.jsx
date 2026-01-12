import React, { useState } from "react";

const sqlTopics = {
  INTRO: {
    title: "Introduction to SQL",
    concept: {
      what: "SQL (Structured Query Language) is used to interact with relational databases.",
      why: "To store, retrieve, update, and manage structured data.",
      when: "Used whenever applications need persistent data storage.",
      problem: "Manages large data efficiently."
    },
    demo: {
      sql: "-- SQL is a declarative language",
      result: [{ note: "Conceptual topic – no execution" }]
    },
    executable: false
  },

COMMANDS: {
  title: "SQL Commands",
  concept: {
    what: "SQL commands are instructions used to communicate with a database.",
    why: "Different commands handle structure, data, security, and transactions.",
    when: "Used whenever interacting with a database.",
    problem: "Organizes database operations clearly."
  },
  demo: {
    sql: `
-- DDL (Data Definition Language)
CREATE, ALTER, DROP, TRUNCATE
→ Used to define database structure

-- DML (Data Manipulation Language)
INSERT, UPDATE, DELETE
→ Used to modify table data

-- DQL (Data Query Language)
SELECT
→ Used to retrieve data

-- DCL (Data Control Language)
GRANT, REVOKE
→ Used to manage permissions

-- TCL (Transaction Control Language)
COMMIT, ROLLBACK, SAVEPOINT
→ Used to manage transactions
    `,
    result: [
      { note: "DDL → Structure of database" },
      { note: "DML → Data inside tables" },
      { note: "DQL → Reading data" },
      { note: "DCL → Security & access" },
      { note: "TCL → Transaction management" }
    ]
  },
  executable: false
}
,
  WHERE: {
    title: "WHERE Clause",
    concept: {
      what: "Filters rows based on conditions.",
      why: "Avoids unnecessary data.",
      when: "When conditions are required.",
      problem: "Improves query accuracy."
    },
    demo: {
      sql: "SELECT * FROM users WHERE country = 'USA';",
      result: [
        { name: "Alice", country: "USA" },
        { name: "Bob", country: "USA" }
      ]
    },
    executable: true
  },

  ORDER_BY: {
    title: "ORDER BY",
    concept: {
      what: "Sorts the result set.",
      why: "Improves readability.",
      when: "Ranking or sorting needed.",
      problem: "Orders data."
    },
    demo: {
      sql: "SELECT * FROM users ORDER BY salary DESC;",
      result: [{ name: "Bob", salary: 60000 }]
    },
    executable: true
  },

  LIMIT: {
    title: "LIMIT",
    concept: {
      what: "Limits number of rows returned.",
      why: "Used for pagination.",
      when: "Top-N queries.",
      problem: "Controls output size."
    },
    demo: {
      sql: "SELECT * FROM users LIMIT 2;",
      result: [{ name: "Alice" }, { name: "Bob" }]
    },
    executable: true
  },

AGGREGATES: {
  title: "Aggregate Functions",
  concept: {
    what: "Aggregate functions perform calculations on multiple rows and return a single value.",
    why: "Used to summarize large amounts of data.",
    when: "Reports, analytics, dashboards.",
    problem: "Cannot summarize data using normal SELECT."
  },
  demo: {
    sql: `
-- COUNT: Number of users
SELECT COUNT(*) FROM users;

-- SUM: Total salary
SELECT SUM(salary) FROM users;

-- AVG: Average salary
SELECT AVG(salary) FROM users;

-- MAX: Highest salary
SELECT MAX(salary) FROM users;

-- MIN: Lowest salary
SELECT MIN(salary) FROM users;

-- Aggregate with GROUP BY
SELECT country, COUNT(*) 
FROM users 
GROUP BY country;
    `,
    result: [
      { note: "COUNT → total rows" },
      { note: "SUM → total value" },
      { note: "AVG → average value" },
      { note: "MAX → highest value" },
      { note: "MIN → lowest value" },
      { note: "Used with GROUP BY for grouping data" }
    ]
  },
  executable: false
}
,
  GROUP_BY: {
    title: "GROUP BY",
    concept: {
      what: "Groups rows for aggregation.",
      why: "Required with aggregate functions.",
      when: "Category-wise summary.",
      problem: "Correct aggregation."
    },
    demo: {
      sql: "SELECT country, COUNT(*) FROM users GROUP BY country;",
      result: [{ country: "USA", count: 2 }]
    },
    executable: false
  },

  HAVING: {
    title: "HAVING",
    concept: {
      what: "Filters aggregated results.",
      why: "WHERE cannot filter aggregates.",
      when: "After GROUP BY.",
      problem: "Post-group filtering."
    },
    demo: {
      sql:
        "SELECT country, COUNT(*) FROM users GROUP BY country HAVING COUNT(*) > 1;",
      result: [{ country: "USA", count: 2 }]
    },
    executable: false
  },

JOINS: {
  title: "JOINS",
  concept: {
    what: "JOIN is used to combine rows from two or more tables based on a related column.",
    why: "Data is normalized and stored across multiple tables.",
    when: "Whenever data from multiple tables is required together.",
    problem: "Data is split across tables."
  },
  demo: {
    sql: `
-- INNER JOIN: Matching rows from both tables
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: All users, with orders if available
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: All orders, with users if available
SELECT u.name, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL JOIN: All users and all orders
SELECT u.name, o.amount
FROM users u
FULL JOIN orders o ON u.id = o.user_id;
    `,
    result: [
      { note: "INNER JOIN → only matching rows" },
      { note: "LEFT JOIN → all left table rows" },
      { note: "RIGHT JOIN → all right table rows" },
      { note: "FULL JOIN → all rows from both tables" }
    ]
  },
  executable: false
}
,
SUBQUERY: {
  title: "Subqueries",
  concept: {
    what: "A subquery is a query written inside another SQL query.",
    why: "Used when a condition depends on the result of another query.",
    when: "When required value is derived from another query.",
    problem: "Unknown values at query time."
  },
  demo: {
    sql: `
-- Single-row subquery
SELECT name
FROM users
WHERE salary > (SELECT AVG(salary) FROM users);

-- Multi-row subquery
SELECT name
FROM users
WHERE country IN (
  SELECT country FROM users WHERE country = 'USA'
);

-- Subquery in SELECT
SELECT name,
       (SELECT AVG(salary) FROM users) AS avg_salary
FROM users;

-- Subquery in FROM
SELECT *
FROM (SELECT * FROM users WHERE salary > 50000) high_salary_users;
    `,
    result: [
      { note: "Single-row subquery → returns one value" },
      { note: "Multi-row subquery → returns multiple values" },
      { note: "Subquery in SELECT clause" },
      { note: "Subquery in FROM clause" }
    ]
  },
  executable: false
}
,
  CONSTRAINTS: {
    title: "Constraints",
    concept: {
      what: "Rules applied to columns.",
      why: "Ensure data integrity.",
      when: "Table creation.",
      problem: "Invalid data prevention."
    },
    demo: {
      sql: `
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
      `,
      result: [{ note: "Schema design concept" }]
    },
    executable: false
  },

  NORMALIZATION: {
    title: "Normalization",
    concept: {
      what: "Process of organizing tables.",
      why: "Reduce redundancy.",
      when: "Database design.",
      problem: "Avoid anomalies."
    },
    demo: {
      sql: "1NF → 2NF → 3NF",
      result: [{ note: "Database design principle" }]
    },
    executable: false
  },

  VIEWS: {
    title: "Views",
    concept: {
      what: "Virtual tables.",
      why: "Simplify queries.",
      when: "Security & abstraction.",
      problem: "Query reuse."
    },
    demo: {
      sql: "CREATE VIEW user_view AS SELECT name, salary FROM users;",
      result: [{ message: "View created" }]
    },
    executable: false
  },

  INDEXES: {
    title: "Indexes",
    concept: {
      what: "Improves SELECT performance.",
      why: "Faster searching.",
      when: "Large tables.",
      problem: "Performance optimization."
    },
    demo: {
      sql: "CREATE INDEX idx_salary ON users(salary);",
      result: [{ note: "Index improves read speed" }]
    },
    executable: false
  },
  DISTINCT: {
    title: "DISTINCT",
    concept: {
      what: "Removes duplicate values from the result set.",
      why: "To get unique records.",
      when: "When duplicate data exists.",
      problem: "Repeated values in query output."
    },
    demo: {
      sql: "SELECT DISTINCT country FROM users;",
      result: [{ country: "USA" }, { country: "India" }]
    },
    executable: false
  },

  AND_OR: {
    title: "AND / OR Operators",
    concept: {
      what: "Logical operators to combine conditions.",
      why: "To apply multiple filters.",
      when: "When more than one condition is required.",
      problem: "Single-condition limitation."
    },
    demo: {
      sql: "SELECT * FROM users WHERE country='USA' AND age > 25;",
      result: [{ name: "Bob" }]
    },
    executable: false
  },

  LIKE: {
    title: "LIKE Operator",
    concept: {
      what: "Used for pattern matching in strings.",
      why: "Search partial text.",
      when: "When exact match is not needed.",
      problem: "Rigid equality checks."
    },
    demo: {
      sql: "SELECT * FROM users WHERE name LIKE 'A%';",
      result: [{ name: "Alice" }]
    },
    executable: false
  },

  IN: {
    title: "IN Operator",
    concept: {
      what: "Checks if a value matches any value in a list.",
      why: "Simplifies multiple OR conditions.",
      when: "Multiple matching values.",
      problem: "Long OR-based conditions."
    },
    demo: {
      sql: "SELECT * FROM users WHERE country IN ('USA','India');",
      result: [{ note: "Multiple country match" }]
    },
    executable: false
  },

  BETWEEN: {
    title: "BETWEEN Operator",
    concept: {
      what: "Filters values within a range.",
      why: "Range-based queries.",
      when: "Salary, age, or date ranges.",
      problem: "Complex range comparisons."
    },
    demo: {
      sql: "SELECT * FROM users WHERE salary BETWEEN 40000 AND 60000;",
      result: [{ note: "Salary range filter" }]
    },
    executable: false
  },

  NULL_CHECKS: {
    title: "IS NULL / IS NOT NULL",
    concept: {
      what: "Checks for NULL values.",
      why: "NULL cannot be compared using '='.",
      when: "Missing or optional data.",
      problem: "Incorrect NULL handling."
    },
    demo: {
      sql: "SELECT * FROM users WHERE salary IS NOT NULL;",
      result: [{ note: "Non-null salaries" }]
    },
    executable: false
  },

  ALIAS: {
    title: "ALIAS (AS)",
    concept: {
      what: "Gives temporary names to columns or tables.",
      why: "Improves readability.",
      when: "Complex queries or reports.",
      problem: "Hard-to-read column names."
    },
    demo: {
      sql: "SELECT name AS employee_name FROM users;",
      result: [{ employee_name: "Alice" }]
    },
    executable: false
  },

  CASE_WHEN: {
    title: "CASE WHEN",
    concept: {
      what: "Conditional logic in SQL.",
      why: "Dynamic output based on conditions.",
      when: "Conditional columns required.",
      problem: "Static result values."
    },
    demo: {
      sql: "CASE WHEN salary > 50000 THEN 'High' ELSE 'Low' END",
      result: [{ note: "Conditional result" }]
    },
    executable: false
  },

  UNION: {
    title: "UNION / UNION ALL",
    concept: {
      what: "Combines result sets of multiple SELECT queries.",
      why: "Merge similar datasets.",
      when: "Combining multiple query results.",
      problem: "Separate result sets."
    },
    demo: {
      sql: "SELECT country FROM users UNION SELECT country FROM users;",
      result: [{ note: "Merged result set" }]
    },
    executable: false
  },

  TRANSACTIONS: {
    title: "Transactions (TCL)",
    concept: {
      what: "Group of SQL operations executed as a unit.",
      why: "Ensures data consistency.",
      when: "Multiple dependent operations.",
      problem: "Partial data updates."
    },
    demo: {
      sql: "COMMIT / ROLLBACK / SAVEPOINT",
      result: [{ note: "Transaction control commands" }]
    },
    executable: false
  } ,
  ACID: {
    title: "ACID Properties",
    concept: {
      what: "Ensures reliable transactions.",
      why: "Maintains consistency.",
      when: "Transactional systems.",
      problem: "Data corruption prevention."
    },
    demo: {
      sql: "Atomicity, Consistency, Isolation, Durability",
      result: [{ note: "Important interview topic" }]
    },
    executable: false
  }
};

/* =====================================================
   MAIN COMPONENT
   ===================================================== */
const Working = () => {
  const [active, setActive] = useState(null);
  const [userSQL, setUserSQL] = useState("");
  const [result, setResult] = useState(null);

  const usersTable = [
    { id: 1, name: "Alice", age: 24, country: "USA", salary: 40000 },
    { id: 2, name: "Bob", age: 30, country: "USA", salary: 60000 },
    { id: 3, name: "Charlie", age: 28, country: "India", salary: 50000 }
  ];

  // Sample orders table to support JOIN demos
  const ordersTable = [
    { id: 101, user_id: 1, amount: 120 },
    { id: 102, user_id: 1, amount: 80 },
    { id: 103, user_id: 2, amount: 200 }
    // Charlie has no orders
  ];

  const runSQL = () => {
    
    if (!userSQL.trim()) {
      setResult([{ error: "❌ Please enter an SQL query." }]);
      return;
    }

    const sqlRaw = userSQL.trim();
    const sql = sqlRaw.replace(/;\s*$/, "");
    const lower = sql.toLowerCase();

    if (!lower.startsWith("select")) {
      setResult([{ error: "❌ Only SELECT queries are executable here." }]);
      return;
    }

    try {
      // Very small SQL parser for the playground
      // Supports: SELECT cols FROM users [WHERE ...] [ORDER BY col [ASC|DESC]] [LIMIT n]
      // WHERE supports AND/OR, =, !=, >, >=, <, <=, LIKE, IN (...), BETWEEN a AND b

      // Break into main clauses without disturbing quoted strings (simple approach)
      const tokens = lower
        .replace(/\s+/g, " ")
        .split(/\b(where|group by|having|order by|limit)\b/);

      // tokens like: ["select ... from users ", "where", " ... ", "group by", " ... ", "having", " ... ", "order by", " ... ", "limit", " ..."]
      const base = tokens[0].trim();
      let whereClause = null, groupByClause = null, havingClause = null, orderByClause = null, limitClause = null;
      for (let i = 1; i < tokens.length; i += 2) {
        const key = tokens[i];
        const val = tokens[i + 1] ? tokens[i + 1].trim() : "";
        if (key === "where") whereClause = val;
        if (key === "group by") groupByClause = val;
        if (key === "having") havingClause = val;
        if (key === "order by") orderByClause = val;
        if (key === "limit") limitClause = val;
      }

      // Parse SELECT list and FROM target
      const m = base.match(/^select\s+(.+)\s+from\s+(\w+)/);
      if (!m) throw new Error("❌ Invalid SELECT syntax");
      let selectList = m[1].trim();
      const fromTable = m[2].trim().toLowerCase();
      if (fromTable !== "users" && fromTable !== "orders") throw new Error("❌ Only 'users' and 'orders' tables are available in this playground");

      // Detect JOIN clause (single join) and aliases
      const afterFrom = base.slice(m[0].length).trim();
      let hasJoin = false;
      let joinMeta = null;
      let leftAlias = null;
      if (afterFrom) {
        const aliasMatch = afterFrom.match(/^(\w+)\b/);
        if (aliasMatch) {
          leftAlias = aliasMatch[1];
          const rest = afterFrom.slice(aliasMatch[0].length).trim();
          const jm = rest.match(/^(inner|left|right|full)\s+join\s+(\w+)(?:\s+(\w+))?\s+on\s+((?:\w+\.)?\w+)\s*=\s*((?:\w+\.)?\w+)/i);
          if (jm) {
            hasJoin = true;
            joinMeta = {
              type: jm[1].toLowerCase(),
              rightTable: jm[2].toLowerCase(),
              rightAlias: (jm[3] ? jm[3].toLowerCase() : jm[2].toLowerCase()),
              leftAlias: leftAlias.toLowerCase(),
              leftKey: jm[4].toLowerCase(),
              rightKey: jm[5].toLowerCase()
            };
            if (joinMeta.rightTable !== 'orders') throw new Error("❌ Only JOIN with 'orders' is supported in this playground");
          }
        }
      }

      // Data source
      let rows = fromTable === "users" ? [...usersTable] : [...ordersTable];

      // WHERE filtering
      if (whereClause && !hasJoin) {
        // Split by OR first, then AND inside each chunk
        const orParts = whereClause
          .replace(/ order by .*/i, "")
          .replace(/ limit .*/i, "")
          .split(/\s+or\s+/i)
          .map(s => s.trim())
          .filter(Boolean);

        const evalExpr = (row, expr) => {
          // Split on AND at top level
          const andParts = expr.split(/\s+and\s+/i).map(s => s.trim());
          return andParts.every(c => evalCondition(row, c));
        };

        rows = rows.filter(row => orParts.some(expr => evalExpr(row, expr)));
      }

      // JOIN execution (users <join> orders)
      if (hasJoin) {
        const rightTableName = joinMeta.rightTable; // 'orders'
        const rightAlias = joinMeta.rightAlias;
        const leftAliasLower = joinMeta.leftAlias || 'users';
        const leftArr = usersTable; // fromTable is users
        const rightArr = rightTableName === 'orders' ? ordersTable : [];

        // Parse ON keys like 'u.id' and 'o.user_id'
        const [lkAlias, lkCol] = (joinMeta.leftKey.includes('.') ? joinMeta.leftKey.split('.') : [leftAliasLower, joinMeta.leftKey]);
        const [rkAlias, rkCol] = (joinMeta.rightKey.includes('.') ? joinMeta.rightKey.split('.') : [rightAlias, joinMeta.rightKey]);
        if (lkAlias !== leftAliasLower || rkAlias !== rightAlias)
          throw new Error("❌ ON clause must reference the provided table aliases");

        // Build indexes for efficient joining
        const indexRight = new Map();
        rightArr.forEach(r => {
          const key = r[rkCol];
          if (!indexRight.has(key)) indexRight.set(key, []);
          indexRight.get(key).push(r);
        });
        const indexLeft = new Map();
        leftArr.forEach(l => {
          const key = l[lkCol];
          if (!indexLeft.has(key)) indexLeft.set(key, []);
          indexLeft.get(key).push(l);
        });

        let joined = [];
        const t = joinMeta.type;
        if (t === 'inner' || t === 'left') {
          leftArr.forEach(l => {
            const key = l[lkCol];
            const matches = indexRight.get(key) || [];
            if (matches.length) {
              matches.forEach(r => joined.push({ [leftAliasLower]: l, [rightAlias]: r }));
            } else if (t === 'left') {
              joined.push({ [leftAliasLower]: l, [rightAlias]: null });
            }
          });
        } else if (t === 'right') {
          rightArr.forEach(r => {
            const key = r[rkCol];
            const matches = indexLeft.get(key) || [];
            if (matches.length) {
              matches.forEach(l => joined.push({ [leftAliasLower]: l, [rightAlias]: r }));
            } else {
              joined.push({ [leftAliasLower]: null, [rightAlias]: r });
            }
          });
        } else if (t === 'full') {
          // Start with LEFT join
          const matchedKeys = new Set();
          leftArr.forEach(l => {
            const key = l[lkCol];
            const matches = indexRight.get(key) || [];
            if (matches.length) {
              matches.forEach(r => {
                joined.push({ [leftAliasLower]: l, [rightAlias]: r });
                matchedKeys.add(r[rkCol]);
              });
            } else {
              joined.push({ [leftAliasLower]: l, [rightAlias]: null });
            }
          });
          // Add RIGHT-only rows
          rightArr.forEach(r => {
            if (!indexLeft.has(r[rkCol])) {
              joined.push({ [leftAliasLower]: null, [rightAlias]: r });
            }
          });
        }

        // Apply WHERE on joined rows if present
        if (whereClause) {
          const orPartsJ = whereClause
            .replace(/ group by .*/i, "")
            .replace(/ having .*/i, "")
            .replace(/ order by .*/i, "")
            .replace(/ limit .*/i, "")
            .split(/\s+or\s+/i)
            .map(s => s.trim())
            .filter(Boolean);

          const evalExprJ = (row, expr) => {
            const andParts = expr.split(/\s+and\s+/i).map(s => s.trim());
            return andParts.every(c => evalCondition(row, c));
          };

          joined = joined.filter(row => orPartsJ.some(expr => evalExprJ(row, expr)));
        }

        rows = joined;
      }

      // ORDER BY and LIMIT will be applied after projection/aggregation

      // DISTINCT
      let distinct = false;
      if (/^distinct\s+/i.test(selectList)) {
        distinct = true;
        selectList = selectList.replace(/^distinct\s+/i, "").trim();
      }

      // Tolerate a trailing comma in SELECT list (e.g., "SELECT name, FROM ...")
      if (/,\s*$/.test(selectList)) {
        selectList = selectList.replace(/,\s*$/, "");
      }

      // Aggregates
      const aggOnly = !groupByClause && selectList.match(/^(count|sum|avg|max|min)\((\*|\w+)\)$/i);
      if (aggOnly) {
        const fn = aggOnly[1].toLowerCase();
        const arg = aggOnly[2].toLowerCase();
        const getVal = (r) => arg === '*' ? 1 : r[arg];
        let out;
        switch (fn) {
          case 'count':
            if (arg === '*') out = rows.length; else out = rows.filter(r => r[arg] !== undefined && r[arg] !== null).length;
            setResult([{ count: out }]);
            return;
          case 'sum':
            out = rows.reduce((s, r) => s + Number(getVal(r) || 0), 0);
            setResult([{ sum: out }]);
            return;
          case 'avg':
            if (rows.length === 0) { setResult([{ avg: 0 }]); return; }
            out = rows.reduce((s, r) => s + Number(getVal(r) || 0), 0) / rows.length;
            setResult([{ avg: Number(out.toFixed(2)) }]);
            return;
          case 'max':
            out = Math.max(...rows.map(r => Number(getVal(r))));
            setResult([{ max: out }]);
            return;
          case 'min':
            out = Math.min(...rows.map(r => Number(getVal(r))));
            setResult([{ min: out }]);
            return;
        }
      }

      // Column selection and GROUP BY aggregation
      let projected;
      if (groupByClause) {
        const groupCols = groupByClause.split(',').map(s => s.trim()).filter(Boolean);
        if (groupCols.length === 0) throw new Error("❌ GROUP BY requires at least one column");
        // Build groups
        const groups = new Map();
        rows.forEach(r => {
          const keyObj = {};
          groupCols.forEach(gc => {
            if (!(gc in r)) throw new Error(`❌ Unknown column '${gc}' in GROUP BY`);
            keyObj[gc] = r[gc];
          });
          const key = JSON.stringify(keyObj);
          if (!groups.has(key)) groups.set(key, { key: keyObj, rows: [] });
          groups.get(key).rows.push(r);
        });

        // Parse SELECT items (allow group columns and aggregates optionally with AS)
        const parts = selectList.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length === 0) throw new Error("❌ No columns selected in SELECT list.");
        const items = parts.map(seg => {
          const am = seg.match(/^(count|sum|avg|max|min)\((\*|\w+)\)\s*(?:as\s+(\w+))?$/i);
          if (am) {
            return { type: 'agg', fn: am[1].toLowerCase(), arg: am[2].toLowerCase(), alias: am[3] || null };
          }
          const cm = seg.match(/^(\w+)(?:\s+as\s+(\w+))?$/i);
          if (!cm) throw new Error("❌ Invalid SELECT item. Use column or AGG(col) [AS alias].");
          const col = cm[1];
          const alias = cm[2] || null;
          if (!groupCols.includes(col)) {
            throw new Error(`❌ Non-aggregated column '${col}' must appear in GROUP BY`);
          }
          return { type: 'col', name: col, alias };
        });

        // Aggregate per group
        const outRows = [];
        for (const { key: keyObj, rows: gr } of groups.values()) {
          const out = {};
          items.forEach(it => {
            if (it.type === 'col') {
              out[it.alias || it.name] = keyObj[it.name];
            } else {
              const getVal = (r) => it.arg === '*' ? 1 : r[it.arg];
              let val;
              switch (it.fn) {
                case 'count':
                  val = it.arg === '*' ? gr.length : gr.filter(r => r[it.arg] !== undefined && r[it.arg] !== null).length;
                  break;
                case 'sum':
                  val = gr.reduce((s, r) => s + Number(getVal(r) || 0), 0);
                  break;
                case 'avg':
                  val = gr.length ? gr.reduce((s, r) => s + Number(getVal(r) || 0), 0) / gr.length : 0;
                  val = Number(val.toFixed(2));
                  break;
                case 'max':
                  val = Math.max(...gr.map(r => Number(getVal(r))));
                  break;
                case 'min':
                  val = Math.min(...gr.map(r => Number(getVal(r))));
                  break;
                default:
                  val = null;
              }
              const defAlias = it.arg === '*' ? it.fn : `${it.fn}_${it.arg}`;
              out[it.alias || defAlias] = val;
            }
          });
          // Attach internal rows for HAVING evaluation
          out.__rows = gr;
          outRows.push(out);
        }

        // HAVING filter
        if (havingClause) {
          const evalHaving = (aggRow, cond) => {
            cond = cond.trim();
            // Aggregate function condition
            const m = cond.match(/(count|sum|avg|max|min)\((\*|\w+)\)\s*(=|!=|>|<|>=|<=)\s*([0-9.]+)/i);
            if (m) {
              const fn = m[1].toLowerCase();
              const arg = m[2].toLowerCase();
              const op = m[3];
              const rhs = Number(m[4]);
              const gr = aggRow.__rows;
              const getVal = (r) => arg === '*' ? 1 : r[arg];
              let lhs;
              switch (fn) {
                case 'count': lhs = arg === '*' ? gr.length : gr.filter(r => r[arg] !== undefined && r[arg] !== null).length; break;
                case 'sum': lhs = gr.reduce((s, r) => s + Number(getVal(r) || 0), 0); break;
                case 'avg': lhs = gr.length ? gr.reduce((s, r) => s + Number(getVal(r) || 0), 0) / gr.length : 0; break;
                case 'max': lhs = Math.max(...gr.map(r => Number(getVal(r)))); break;
                case 'min': lhs = Math.min(...gr.map(r => Number(getVal(r)))); break;
                default: lhs = 0;
              }
              switch (op) {
                case '=': return lhs === rhs;
                case '!=': return lhs !== rhs;
                case '>': return lhs > rhs;
                case '<': return lhs < rhs;
                case '>=': return lhs >= rhs;
                case '<=': return lhs <= rhs;
              }
              return false;
            }
            // Fallback: allow conditions on grouped columns using same evaluator
            return evalCondition(aggRow, cond);
          };

          const orParts = havingClause.split(/\s+or\s+/i).map(s => s.trim()).filter(Boolean);
          const andOrFiltered = outRows.filter(row => {
            return orParts.some(expr => {
              const andParts = expr.split(/\s+and\s+/i).map(s => s.trim());
              return andParts.every(c => evalHaving(row, c));
            });
          });
          projected = andOrFiltered.map(r => {
            const { __rows, ...rest } = r; return rest; 
          });
        } else {
          projected = outRows.map(r => { const { __rows, ...rest } = r; return rest; });
        }
      } else {
        // Non-grouped projection (row-wise)
        if (selectList === '*') {
          // Flatten when result rows come from a JOIN
          projected = rows.map(r => {
            if (r && typeof r === 'object' && (r.hasOwnProperty('u') || r.hasOwnProperty('o'))) {
              const obj = {};
              if (r.u && typeof r.u === 'object') {
                Object.keys(r.u).forEach(k => obj[`u_${k}`] = r.u[k]);
              }
              if (r.o && typeof r.o === 'object') {
                Object.keys(r.o).forEach(k => obj[`o_${k}`] = r.o[k]);
              }
              // Add null indicators for missing side in outer joins
              if (!r.u) {
                const ordersKeys = ['id', 'user_id', 'amount'];
                ordersKeys.forEach(k => obj[`o_${k}`] = null);
              }
              if (!r.o) {
                const usersKeys = ['id', 'name', 'age', 'country', 'salary'];
                usersKeys.forEach(k => obj[`u_${k}`] = null);
              }
              return obj;
            }
            return { ...r };
          });
        } else {
          const parts = selectList.split(',').map(s => s.trim()).filter(Boolean);
          if (parts.length === 0) throw new Error("❌ No columns selected in SELECT list.");
          const columns = parts.map(seg => {
            const am = seg.match(/^((?:\w+\.)?\w+)\s+as\s+(\w+)$/i) || seg.match(/^((?:\w+\.)?\w+)$/);
            if (!am) throw new Error("❌ Invalid column expression in SELECT");
            return { src: am[1].toLowerCase(), alias: (am[2] || null) };
          });
          projected = rows.map(r => {
            const obj = {};
            columns.forEach(c => {
              const val = getValueByColumn(r, c.src);
              if (typeof val === 'undefined') throw new Error(`❌ Unknown column '${c.src}' in SELECT`);
              const keyName = c.alias || c.src.split('.').pop();
              obj[keyName] = val;
            });
            return obj;
          });
        }
      }

      if (distinct) {
        const seen = new Set();
        projected = projected.filter(row => {
          const key = JSON.stringify(row);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }

      // ORDER BY on projected result
      if (orderByClause && projected.length) {
        const ob = orderByClause.replace(/ limit .*/i, "").trim();
        const obm = ob.match(/^(\w+)(\s+(asc|desc))?/i);
        if (!obm) throw new Error("❌ Invalid ORDER BY clause");
        const col = obm[1];
        const dir = (obm[3] || 'asc').toLowerCase();
        if (!(col in projected[0])) throw new Error(`❌ Unknown column '${col}' in ORDER BY`);
        projected = [...projected].sort((a, b) => {
          const av = a[col];
          const bv = b[col];
          let cmp = 0;
          if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
          else cmp = String(av).localeCompare(String(bv));
          return dir === 'desc' ? -cmp : cmp;
        });
      }

      // LIMIT on projected result
      if (limitClause) {
        const lm = limitClause.match(/^(\d+)/);
        if (!lm) throw new Error("❌ Invalid LIMIT clause");
        const n = parseInt(lm[1], 10);
        projected = projected.slice(0, n);
      }

      setResult(projected.length ? projected : [{ message: "No rows found" }]);
    } catch (e) {
      setResult([{ error: e.message }]);
    }
  };

  // Resolve column references, supporting alias.column in JOIN results
  const getValueByColumn = (row, colExpr) => {
    const col = colExpr.trim();
    
    // Try to resolve qualified column references (e.g., 'u.name', 'o.amount')
    if (col.includes('.')) {
      const parts = col.split('.');
      const alias = parts[0];
      const name = parts.slice(1).join('.');
      
      // Check if row has a property with the alias name
      if (row && row.hasOwnProperty(alias) && row[alias] !== null && typeof row[alias] === 'object') {
        return row[alias][name];
      }
      // If not found, return undefined
      return undefined;
    }
    
    // For unqualified columns, check in JOIN results first (prefer left, then right)
    if (row && typeof row === 'object') {
      // Check if this looks like a JOIN result (has table aliases as object properties)
      const tableAliases = Object.keys(row).filter(key => row[key] !== null && typeof row[key] === 'object');
      
      if (tableAliases.length > 0) {
        // This is a JOIN result - try to find the column in the aliased tables
        for (const alias of tableAliases) {
          if (row[alias].hasOwnProperty(col)) {
            return row[alias][col];
          }
        }
        // Column not found in any aliased table
        return undefined;
      }
      
      // Regular non-JOIN row - just access the property directly
      return row[col];
    }
    
    return undefined;
  };

  const evalCondition = (row, cond) => {
    cond = cond.trim();

    if (cond.includes(" like ")) {
      const [col, pattern] = cond.split(" like ");
      const colName = col.trim();
      const fieldVal = getValueByColumn(row, colName);
      if (typeof fieldVal === 'undefined') throw new Error(`❌ Unknown column '${colName}'`);
      if (fieldVal === null) return false;
      const regex = new RegExp(pattern.replace(/'/g, "").replace(/%/g, ".*"), "i");
      return regex.test(String(fieldVal));
    }

    if (cond.includes(" in ")) {
      const [col, list] = cond.split(" in ");
      const colName = col.trim();
      const fieldVal = getValueByColumn(row, colName);
      if (typeof fieldVal === 'undefined') throw new Error(`❌ Unknown column '${colName}'`);
      if (fieldVal === null) return false;
      const values = list.replace(/[()']/g, "").split(",").map(v => v.trim().toLowerCase());
      return values.includes(String(fieldVal).toLowerCase());
    }

    if (cond.includes(" between ")) {
      const [col, range] = cond.split(" between ");
      const colName = col.trim();
      const fieldVal = getValueByColumn(row, colName);
      if (typeof fieldVal === 'undefined') throw new Error(`❌ Unknown column '${colName}'`);
      if (fieldVal === null) return false;
      const [a, b] = range.split(" and ").map(v => Number(v.trim()));
      return Number(fieldVal) >= a && Number(fieldVal) <= b;
    }

    // Match pattern: column operator 'value' or column operator value
    const match = cond.match(/(\w+)\s*(=|!=|>|<|>=|<=)\s*'([^']*)'/) || 
                  cond.match(/(\w+)\s*(=|!=|>|<|>=|<=)\s*(\S+)/);
    
    if (!match) throw new Error("❌ Invalid WHERE condition");

    const [, col, op, val] = match;
    const colName = col.trim();
    const value = val.trim();

    const fieldVal = getValueByColumn(row, colName);
    if (typeof fieldVal === 'undefined') throw new Error(`❌ Unknown column '${colName}'`);
    
    // Handle NULL comparisons
    if (fieldVal === null || value === 'null') {
      if (op === '=') return fieldVal === null && value === 'null';
      if (op === '!=') return !(fieldVal === null && value === 'null');
      return false;
    }

    const numVal = Number(value);
    const isNumber = !isNaN(numVal) && typeof fieldVal === 'number';

    switch (op) {
      case "=": 
        return isNumber ? fieldVal === numVal : String(fieldVal).toLowerCase() === value.toLowerCase();
      case "!=": 
        return isNumber ? fieldVal !== numVal : String(fieldVal).toLowerCase() !== value.toLowerCase();
      case ">": 
        return isNumber && fieldVal > numVal;
      case "<": 
        return isNumber && fieldVal < numVal;
      case ">=": 
        return isNumber && fieldVal >= numVal;
      case "<=": 
        return isNumber && fieldVal <= numVal;
      default: 
        return false;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result[0]?.error || result[0]?.note || result[0]?.message) {
      return <pre>{JSON.stringify(result, null, 2)}</pre>;
    }

    return (
      <table>
        <thead>
          <tr>
            {Object.keys(result[0]).map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="navbar">SQL LEARNING PLAYGROUND</div>

      <div className="wrapper">
        <div className="sidebar-left">
          <div className="section">
            <h2>📘 Sample Database Tables</h2>

            <h3 style={{ marginTop: '15px' }}>Table 1: users</h3>
            <pre className="code-box">
{`users
-----------------------------------
id | name     | age | country | salary`}
            </pre>

            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>age</th>
                  <th>country</th>
                  <th>salary</th>
                </tr>
              </thead>
              <tbody>
                {usersTable.map((row, i) => (
                  <tr key={i}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                    <td>{row.country}</td>
                    <td>{row.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ marginTop: '20px' }}>Table 2: orders</h3>
            <pre className="code-box">
{`orders
-----------------------------------
id | user_id | amount`}
            </pre>

            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>user_id</th>
                  <th>amount</th>
                </tr>
              </thead>
              <tbody>
                {ordersTable.map((row, i) => (
                  <tr key={i}>
                    <td>{row.id}</td>
                    <td>{row.user_id}</td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {Object.keys(sqlTopics).map((key) => (
            <div className="method" key={key}>
              <span>{sqlTopics[key].title}</span>
              <button
                onClick={() => {
                  setActive(sqlTopics[key]);
                  setResult(sqlTopics[key].demo.result);
                  setUserSQL("");
                }}
              >
                Learn
              </button>
            </div>
          ))}
        </div>

        <div className="output-panel">
          {!active ? (
            <p>👈 Select a topic to start learning SQL</p>
          ) : (
            <>
              <h2>{active.title}</h2>
              <ul>
                <li><b>What:</b> {active.concept.what}</li>
                <li><b>Why:</b> {active.concept.why}</li>
                <li><b>When:</b> {active.concept.when}</li>
                <li><b>Problem Solved:</b> {active.concept.problem}</li>
              </ul>

              {active.key === 'JOINS' && (
                <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
                  <h3>📊 Available Tables for JOIN</h3>
                  <p><b>Table 1: orders</b> (user_id references users.id)</p>
                  <table style={{ marginBottom: '10px' }}>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>user_id</th>
                        <th>amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersTable.map((row, i) => (
                        <tr key={i}>
                          <td>{row.id}</td>
                          <td>{row.user_id}</td>
                          <td>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ fontSize: '0.9em', color: '#666' }}>You can write JOINs between <b>users</b> and <b>orders</b> tables!</p>
                </div>
              )}

              <h3>Demo SQL</h3>
              <pre className="code-box">{active.demo.sql}</pre>

              <h3>Practice</h3>
              <textarea
                className="css-editor"
                value={userSQL}
                onChange={(e) => setUserSQL(e.target.value)}
                placeholder="Write SQL here..."
              />
              <button className="apply-btn" onClick={runSQL}>
                Execute
              </button>

              <h3>Output</h3>
              <div className="preview-box">{renderResult()}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Working;