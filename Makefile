SRC_DIR = src
TEST_DIR = test
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node nodejs`
COMPILER = ${JS_ENGINE} ${BUILD_DIR}/uglify.js --unsafe
POST_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/post-compile.js

BASE_FILES = ${SRC_DIR}/extend.js\
	${SRC_DIR}/core.js\
	${SRC_DIR}/wrappers.js\
	${SRC_DIR}/events.js\
	${SRC_DIR}/timer.js\
	${SRC_DIR}/commands.js
	
MODULES = ${SRC_DIR}/intro.js\
	${BASE_FILES}\
	${SRC_DIR}/outro.js
	
PQ = ${DIST_DIR}/_plusquery.js
PQ_MIN = ${DIST_DIR}/_plusquery.min.js

PQ_VER = $(shell cat version.txt)

DATE=$(shell git log -1 --pretty=format:%ad)

all: plusquery min lint package
	@@echo "plusQuery build complete."
	
${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}
	
plusquery: ${PQ}

${PQ}: ${MODULES} | ${DIST_DIR}
	@@echo "Building" ${PQ}

	@@cat ${MODULES} | \
#		sed 's/.function..plusQuery...{//' | \
#		sed 's/}...plusQuery..;//' | \
		sed 's/@DATE/'"${DATE}"'/' | \
		sed 's/@VERSION/${PQ_VER}/' > ${PQ};
		
lint: plusquery
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Checking plusQuery against JSLint..."; \
		${JS_ENGINE} build/jslint-check.js; \
	else \
		echo "You must have NodeJS installed in order to test plusQuery against JSLint."; \
	fi
	
min: ${PQ_MIN}

${PQ_MIN}: plusquery
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minifying plusQuery" ${PQ_MIN}; \
		${COMPILER} ${PQ} > ${PQ_MIN}.tmp; \
		${POST_COMPILER} ${PQ_MIN}.tmp > ${PQ_MIN}; \
		rm -f ${PQ_MIN}.tmp; \
	else \
		echo "You must have NodeJS installed in order to minify plusQuery."; \
	fi
	
clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
	
package:
	@@echo "Packaging script..."
	@@zip /var/www/plusQuery.plsc ~/ScriptInfo.xml ${DIST_DIR}/_plusquery.js

.PHONY: all plusquery lint min clean core
