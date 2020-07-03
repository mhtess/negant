## Compiling paper

Note that models are written in RMarkdown using [RWebPPL](https://github.com/mhtess/rwebppl). To compile this document, your system may need to be ready to install RWebPPL (see RWebPPL system requirements).

1. Clone repo
2. Open Rstudio
3. File —> New Project
	- select “Existing Directory”
	- navigate to cloned repo
4. In Rstudio console:
  ```
  install.packages(“packrat”)
  library(packrat)
  packrat::on()
  packrat::restore()
  ```

  [will take about 5 minutes for all the packages to install]

 5. Open in RStudio: `writing/cogsci/negant-cogsci2018.Rmd`
 6. Knit! (very first time you knit, it may ask you to upgrade a package or two; just hit yes)

 ## Troubleshooting

 - if packrat fails to restore on a particular package, try installing that package manually from the command line using `install.packages("packageName")`
 - if rmarkdown prompts you to install packages upon knitting, and you click OK, and nothing happens, try installing those packages manually as well
