#!/usr/bin/env node

//Modules
const mal = require('malapi').Anime;
const chalk = require('chalk');
const figlet = require('figlet');

//Customs
const log = console.log;
const mainTitle = figlet.textSync('ASC - cli', { horizontalLayout: 'full' });
const suffix = process.argv.slice(2).join('+');

if (!module.parent) {
    run();
}

function run() {
    try {
        if (!suffix) {
            log(chalk.red('ERROR: Didn\'t provide a valid search term.'));
            log(chalk.cyan(`USAGE: >asc <anime_name> ~ example: ${chalk.underline('>asc Noragami')}`));
            return process.exit();
        }
        mal.fromName(suffix).then(anime => {

            log(chalk.yellowBright(mainTitle));

            log(`${chalk.green.bold('TITLE')}      : ${anime.title} | ${anime.alternativeTitles.japanese.join(', ').substring(9).trim()} - [ID: ${anime.id}]`);
            log(`${chalk.green.bold('URL')}        : ${anime.detailsLink}`);
            log(`${chalk.green.bold('IMG_URL')}    : ${anime.image}`);
            log(`${chalk.green.bold('TYPE')}       : ${anime.type}`);
            log(`${chalk.green.bold('AGE_RATING')} : ${anime.classification.slice(0, 6)}`);
            log(`${chalk.green.bold('EPISODES')}   : ${anime.episodes}`);
            log(`${chalk.green.bold('STATUS')}     : ${anime.status}`);
            log(`${chalk.green.bold('RATING')}     : ${anime.statistics.score.value}`);
            log(`${chalk.green.bold('RANKED')}     : ${anime.statistics.ranking}`);
            log(`${chalk.green.bold('POPULARITY')} : ${anime.statistics.ranking}`);
            log(`${chalk.green.bold(anime.studios.length === 1 ? 'STUDIO     ' : 'STUDIOS    ')}: ${anime.studios.join(', ').replace('       ', '')}`);
            log(`${chalk.green.bold('AIRED_DATE')} : ${anime.aired}`);
            log(`\n${chalk.green.bold('SYNOPSIS')}   :\n${anime.synopsis}`);
        });
    } catch(err) {
        log(chalk.red(err));
    }
}
