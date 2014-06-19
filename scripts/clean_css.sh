#!/bin/bash
FILE=$1
DIR=$2
exec 3<$FILE
while read line <&3
do
	class=$(echo $line | grep -Poh "\.[A-Za-z-_]+")
	if [[ $class ]]; then
		found="no"
		for file in $(find $DIR -type f)
		do
			if [[ $(grep -oh "$class" $file) ]]; then
				found="yes"
			fi
		done
		if [[ $found = "no" ]]; then
			echo "$class not used"
		fi
	fi
done
exec 3<&-
